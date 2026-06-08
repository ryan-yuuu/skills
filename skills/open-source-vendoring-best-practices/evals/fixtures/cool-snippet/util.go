package util

import (
	"time"
)

// RetryWithBackoff calls fn up to maxAttempts times, doubling the delay
// between attempts starting from base. It returns the last error if all
// attempts fail.
func RetryWithBackoff(maxAttempts int, base time.Duration, fn func() error) error {
	var err error
	delay := base
	for attempt := 0; attempt < maxAttempts; attempt++ {
		if err = fn(); err == nil {
			return nil
		}
		time.Sleep(delay)
		delay *= 2
	}
	return err
}
