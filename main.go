package main

import (
	"github.com/Caracal-IT/polaris/config"
	home "github.com/Caracal-IT/polaris/controllers"
	"log"
	"net/http"
)

func main() {
	addr := config.GetConfig().Address

	http.HandleFunc("/", home.Index)

	http.Handle("/favicon.ico", http.NotFoundHandler())
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	log.Fatal(http.ListenAndServe(addr, nil))
}
