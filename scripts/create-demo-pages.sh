#!/bin/bash

# Demo script to create pages via API
# Make sure your Next.js app is running first: npm run dev

BASE_URL="http://localhost:3000"

echo "Creating demo pages via API..."

# Create a simple about page
echo "Creating 'about-us' page..."
curl -X POST $BASE_URL/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "about-us",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "About Our Company",
          "content": "We are a forward-thinking technology company dedicated to creating innovative solutions.",
          "size": "lg",
          "align": "center"
        }
      },
      {
        "type": "Card",
        "props": {
          "title": "Our Mission",
          "content": "To democratize technology and make powerful tools accessible to everyone.",
          "variant": "primary"
        }
      }
    ]
  }'

echo -e "\n\nCreating 'services' page..."
curl -X POST $BASE_URL/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "services",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "Our Services",
          "content": "We offer comprehensive solutions for your business needs.",
          "align": "center"
        }
      },
      {
        "type": "Card",
        "props": {
          "title": "Web Development",
          "content": "Custom websites and web applications built with modern technologies.",
          "variant": "primary"
        }
      },
      {
        "type": "Card",
        "props": {
          "title": "Mobile Apps",
          "content": "Native and cross-platform mobile applications for iOS and Android.",
          "variant": "secondary"
        }
      },
      {
        "type": "CTA",
        "props": {
          "text": "Get a Quote",
          "href": "/contact",
          "variant": "primary",
          "size": "lg"
        }
      }
    ]
  }'

echo -e "\n\nDemo pages created! Visit:"
echo "- $BASE_URL/about-us"
echo "- $BASE_URL/services"
echo "- $BASE_URL/demo-product (pre-created)"
echo "- $BASE_URL/company-overview (pre-created)"
