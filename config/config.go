package config

import (
	"github.com/spf13/viper"
	"log"
	"path"
)

type Config struct {
	Address string `yaml:"address"`
}

var config Config

func init() {
	viper.SetConfigType("yaml")
	viper.AddConfigPath(path.Dir("config"))
	viper.SetConfigName("config")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Fatal error config file: %s \n", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("Fatal error parsing config: %s \n", err)
	}
}

func GetConfig() Config {
	return config
}
