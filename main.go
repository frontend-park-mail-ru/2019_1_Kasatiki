package main

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"sort"
	"strconv"
)

// ToDo бахнуть обработку ошибок

type User struct {
	ID       string
	Nickname string `json:"nickname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Points   int
	Age      int
	ImgUrl   string
	Region   string
	About    string
}

type Order struct {
	Sequence string `json:"order"`
}

//ToDo: Move to another package
var errorLogin = map[string]string{
	"Error": "User dont exist",
}

var errorCreateUser = map[string]string{
	"Error": "Nickname/mail already exists",
}

var users []User

func (u *User) setUniqueId() {
	// DB incremental or smth
	out, _ := exec.Command("uuidgen").Output()
	u.Points = 0
	u.ID = string(out[:len(out)-1])
}

func createUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println(users)
	w.Header().Set("Content-Type", "application/json")
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser) // ToDo: Log error
	for _, existUser := range users {
		if newUser.Nickname == existUser.Nickname || newUser.Email == existUser.Email {
			json.NewEncoder(w).Encode(errorCreateUser)
			return
		}
	}
	newUser.setUniqueId()
	users = append(users, newUser) // Check succesfull append? ( in db clearly )
	//json.NewEncoder(w).Encode(newUser)

}

//ToDo: Use get with key order? (ASC/DESC )
//ToDo: Check and simplify conditions !!!
func getLeaderboard(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var order Order
	var pageSize int
	// Initilize pagesize
	pageSize = 1
	_ = json.NewDecoder(r.Body).Decode(&order)
	sort.Slice(users, func(i, j int) bool {
		return users[i].Points > users[j].Points
	})
	offset, getOffset := r.URL.Query()["offset"]
	if getOffset {
		offsetInt, _ := strconv.ParseInt(offset[0], 10, 32) // ToDo Handle error
		if int(offsetInt) > len(users) {
			json.NewEncoder(w).Encode(users)
			return
		} else if int(offsetInt) == len(users) {
			json.NewEncoder(w).Encode(users)
			return
		}
		if int(offsetInt)+pageSize < len(users) {
			json.NewEncoder(w).Encode(users[offsetInt : int(offsetInt)+pageSize])
			return
		} else {
			json.NewEncoder(w).Encode(users[offsetInt:len(users)])
			return
		}
	} else {
		if pageSize < len(users) {
			json.NewEncoder(w).Encode(users[:pageSize])
			return
		} else {
			json.NewEncoder(w).Encode(users)
			return
		}
	}

}

func createSessionId(user User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.ID,
	})
	// ToDo: Error handle
	spiceSalt, _ := ioutil.ReadFile("secret.conf")
	secretStr, _ := token.SignedString(spiceSalt)
	return secretStr
}

func checkAuth(cookie *http.Cookie) jwt.MapClaims {
	token, _ := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		spiceSalt, _ := ioutil.ReadFile("secret.conf")
		return spiceSalt, nil
	})

	claims, _ := token.Claims.(jwt.MapClaims)

	// ToDo: Handle else case
	return claims
}

func isAuth(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_id")
	if err != nil {
		w.Write([]byte("{}"))
		return
	}

	claims := checkAuth(cookie)
	for _, user := range users {
		if user.Nickname == claims["id"].(string) {
			json.NewEncoder(w).Encode(map[string]bool{"is_auth": true})
			return
		}
	}
	json.NewEncoder(w).Encode(map[string]bool{"is_auth": false})
}

func editUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println(users)
	//Checking cookie
	cookie, err := r.Cookie("session_id")
	if err != nil {
		w.Write([]byte("{}"))
		return
	}
	// Taking JSON of modified user from edit form
	var modUser User
	_ = json.NewDecoder(r.Body).Decode(&modUser)
	file, _, err := r.FormFile("avatar")
	fmt.Println(file)
	// Getting claims from current cookie
	claims := checkAuth(cookie)

	// Finding user from claims in users and changing old data to modified data
	for i, user := range users {
		if user.ID == claims["id"].(string) {
			u := &users[i]
			if modUser.Nickname != "" {
				u.Nickname = modUser.Nickname
			}
			if modUser.Email != "" {
				u.Email = modUser.Email
			}
			if modUser.Password != "" {
				u.Password = modUser.Password
			}
			if modUser.Region != "" {
				u.Region = modUser.Region
			}
			if modUser.Age != 0 {
				u.Age = modUser.Age
			}
			if modUser.About != "" {
				u.About = modUser.About
			}
			if modUser.ImgUrl != "" {
				u.ImgUrl = modUser.ImgUrl
			}
			json.NewEncoder(w).Encode(*u)
			break
		}
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	var sessionId string
	var userExistFlag bool
	var existUser User
	_ = json.NewDecoder(r.Body).Decode(&existUser)
	for _, user := range users {
		if user.Nickname == existUser.Nickname && user.Password == existUser.Password {
			userExistFlag = true
			existUser = user
		}
	}
	if !userExistFlag {
		json.NewEncoder(w).Encode(errorLogin)
		return
	}
	sessionId = createSessionId(existUser)
	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    sessionId,
		HttpOnly: false,
	}
	http.SetCookie(w, cookie)
	json.NewEncoder(w).Encode(existUser)
}

func getMe(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_id")
	if err != nil {
		w.Write([]byte("{}"))
		return
	}
	claims := checkAuth(cookie)
	for _, user := range users {
		if user.ID == claims["id"].(string) {
			json.NewEncoder(w).Encode(user)
			return
		}
	}
}

// ToDO: Add case sensitive ( high/low )
func getUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range users {
		//id, _ := strconv.Atoi(params["ID"])
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&User{})
}

func upload(w http.ResponseWriter, r *http.Request) {
	// Tacking file from request
	fmt.Println("UPLOAD")
	r.ParseMultipartForm(32 << 20)
	fmt.Println(r)
	file, _, err := r.FormFile("uploadfile")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Println("FILE IS HERE")

	// Tacking cookie of current user
	cookie, err := r.Cookie("session_id")
	if err != nil {
		w.Write([]byte("{}"))
		return
	}
	claims := checkAuth(cookie)
	// Path to users avatar
	picpath := "./static/img/" + claims["id"].(string) + ".jpeg"
	f, err := os.OpenFile(picpath, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Changing ImgURL field in current user
	for i, user := range users {
		if user.ID == claims["id"].(string) {
			u := &users[i]
			u.ImgUrl = picpath
		}
	}
	defer f.Close()
	io.Copy(f, file)
}

func main() {
	// Mocked part for leaderboard
	var mockedUser = User{"1", "evv", "onetaker@gmail.com",
		"evv", -100, 23, "test",
		"Voronezh", "В левой руке салам"}
	var mockedUser1 = User{"2", "tony", "trendpusher@hydra.com",
		"qwerty", 100, 22, "test",
		"Moscow", "В правой алейкум"}
	// Mocker part end
	users = append(users, mockedUser)
	users = append(users, mockedUser1)
	reciever := mux.NewRouter()
	// GET  ( get exists data )

	reciever.HandleFunc("/users/{Nickname}", getUser).Methods("GET")

	reciever.HandleFunc("/leaderboard", getLeaderboard).Methods("GET")
	reciever.HandleFunc("/isauth", isAuth).Methods("GET")
	reciever.HandleFunc("/me", getMe).Methods("Get")
	//reciever.HandleFunc("/edit", editUser).Methods("GET")

	// POST ( create new data )
	reciever.HandleFunc("/signup", createUser).Methods("POST")
	reciever.HandleFunc("/upload", upload).Methods("POST")
	reciever.HandleFunc("/login", login).Methods("POST")
	reciever.HandleFunc("/users/{Nickname}", editUser).Methods("POST")

	reciever.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/"))) // Uncomment if want to run locally
	log.Fatal(http.ListenAndServe(":8080", reciever))
}
