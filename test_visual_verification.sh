#!/bin/bash
# Test script for Gemini Integration

# 1. Non-Food Image (Small red dot base64)
# Note: Gemini might correctly identify this as "Not Food" or "Red pixel".
NON_FOOD_IMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

# 2. To test with a REAL food image:
# users should replace the string below with a base64 of a real food photo (e.g., using an online converter)
# or just rely on the frontend upload which handles this.
FOOD_IMG_PLACEHOLDER="$NON_FOOD_IMG" 

echo "--- TEST 1: Sending Image to Gemini Endpoint ---"
echo "Note: If GEMINI_API_KEY is missing, it will use a mock response."
echo "Note: If key is present, this tiny pixel might be rejected as non-food."

curl -X POST http://127.0.0.1:3000/api/audit-dish \
  -H "Content-Type: application/json" \
  -d "{ \"orderId\": \"TEST-GEMINI\", \"photoUrls\": [\"$FOOD_IMG_PLACEHOLDER\"] }"

echo "\n\nDone."
