package entity

import (
	"time"
)

type Echo struct {
	ID      string    `bson:"_id,omitempty"`
	Message string    `bson:"message,omitempty"`
	Time    time.Time `bson:"time,omitempty"`
}
