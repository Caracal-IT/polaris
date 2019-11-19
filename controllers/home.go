package home

import (
	"log"
	"net/http"
	"polaris/config"
)

func Index(wr http.ResponseWriter, resp *http.Request){
	err := config.TPL.ExecuteTemplate(wr, "home_index.gohtml", nil)
	if err != nil {
		log.Fatal(err)
	}
}