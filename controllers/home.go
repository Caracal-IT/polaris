package home

import (
	"github.com/Caracal-IT/polaris/config"
	"log"
	"net/http"
)

func Index(wr http.ResponseWriter, resp *http.Request) {
	err := config.TPL.ExecuteTemplate(wr, "home_index.gohtml", nil)
	if err != nil {
		log.Fatal(err)
	}
}
