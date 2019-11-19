package main

import (
	"log"
	"net/http"
	"polaris/config"
	"polaris/controllers"
)

func main() {
	addr := config.GetConfig().Address

	http.HandleFunc("/", home.Index)

	http.Handle("/favicon.ico", http.NotFoundHandler())
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	log.Fatal(http.ListenAndServe(addr, nil))
}
