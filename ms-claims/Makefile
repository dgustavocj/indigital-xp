.DEFAULT_GOAL := help

## INCLUDE ##
include makefiles/app.mk
include makefiles/ct.mk
include makefiles/npm.mk
-include makefiles/ecr.mk
-include makefiles/k8s.mk

## GENERAL ##
OWNER          = culqi

PROJECT_NAME   = $(shell basename "$(PWD)")
IMAGE          = $(PROJECT_NAME):latest

PROJECT_DIR    = app
MODULE_NAME    = $(shell jq -r '."module-name"' ${PROJECT_DIR}/package.json)
WORKDIR        = /usr/src/${PROJECT_DIR}
IMAGE          = ${PROJECT_NAME}:latest
HTTP_PORT     ?= 8080

APP_ENV       ?= local
ENV           ?= local
DEPLOY_REGION ?= us-west-2

## HELP ##
help:
	@printf "\033[31m%-17s %-39s %s\033[0m\n" "Target" "Help"; \
	printf "\033[31m%-17s %-39s %s\033[0m\n" "------" "----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-17s\033[0m %-0s \033[34m%s\033[0m\n", $$1, $$2, $$3}'

