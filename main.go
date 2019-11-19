package main

import (
	"log"
	"net/http"
	"polaris/controllers"
)

func main() {
	http.HandleFunc("/", home.Index)

	http.Handle("/favicon.ico", http.NotFoundHandler() )
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	log.Fatal(http.ListenAndServe(":8282", nil))
}
