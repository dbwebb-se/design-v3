#!/usr/bin/env make

# ------------------------------------------------------------------------
#
# General stuff, reusable for all Makefiles.
#

# Detect OS
OS = $(shell uname -s)

# Defaults
ECHO = echo

# Make adjustments based on OS
ifneq (, $(findstring CYGWIN, $(OS)))
	ECHO = /bin/echo -e
endif

# Colors and helptext
NO_COLOR	= \033[0m
ACTION		= \033[32;01m
OK_COLOR	= \033[32;01m
ERROR_COLOR	= \033[31;01m
WARN_COLOR	= \033[33;01m

# Print out colored action message
ACTION_MESSAGE = $(ECHO) "$(ACTION)---> $(1)$(NO_COLOR)"

# Which makefile am I in?
WHERE-AM-I = $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_MAKEFILE := $(call WHERE-AM-I)

# Echo some nice helptext based on the target comment
HELPTEXT = $(call ACTION_MESSAGE, $(shell egrep "^\# target: $(1) " $(THIS_MAKEFILE) | sed "s/\# target: $(1)[ ]*-[ ]* / /g"))

# Check version  and path to command and display on one line
CHECK_VERSION = printf "%-15s %-10s %s\n" "`basename $(1)`" "`$(1) --version $(2)`" "`which $(1)`"

# Get current working directory, it may not exist as environment variable.
PWD = $(shell pwd)

# target: help                    - Displays help.
.PHONY:  help
help:
	@$(call HELPTEXT,$@)
	@sed '/^$$/q' $(THIS_MAKEFILE) | tail +3 | sed 's/#\s*//g'
	@$(ECHO) "Usage:"
	@$(ECHO) " make [target] ..."
	@$(ECHO) "target:"
	@egrep "^# target:" $(THIS_MAKEFILE) | sed 's/# target: / /g'

# ------------------------------------------------------------------------
#
# Specifics for this project.
#
# Default values for arguments


# ------------------------------------------------------------------------
#
# Composer and NPM
#

# target: clean-cache             - Clean the cache.
.PHONY:  clean-cache
clean-cache:
	@$(call HELPTEXT,$@)
	rm -rf cache/*/*



# target: clean-all               - Removes generated files and directories.
.PHONY:  clean-all
clean-all:
	@$(call HELPTEXT,$@)
	rm -rf vendor composer.lock

# target: install                 - Install all tools
.PHONY:  install
install:
	@$(call HELPTEXT,$@)
	composer install


# target: update                  - Update the codebase and tools.
.PHONY:  update
update:
	@$(call HELPTEXT,$@)
	[ ! -d .git ] || git pull
	composer update
	make cimage-install
	make cimage-config-create


# ------------------------------------------------------------------------
#
# Cimage
#

define CIMAGE_CONFIG
<?php
return [
    "mode"         => "development",
    "image_path"   =>  __DIR__ . "/../../assets/img/",
    "cache_path"   =>  __DIR__ . "/../../cache/cimage/",
    "autoloader"   =>  __DIR__ . "/../../vendor/autoload.php",
];
endef
export CIMAGE_CONFIG

define GIT_IGNORE_FILES
# Ignore everything in this directory
*
# Except this file
!.gitignore
endef
export GIT_IGNORE_FILES

# target: cimage-install          - Install Cimage in htdocs
.PHONY: cimage-install
cimage-install:
	@$(call HELPTEXT,$@)
	install -d assets/img assets/cimage cache/cimage
	chmod 777 cache/cimage
	$(ECHO) "$$GIT_IGNORE_FILES" | bash -c 'cat > cache/cimage/.gitignore'
	cp vendor/mos/cimage/webroot/img.php assets/cimage
	touch assets/cimage/img_config.php

# target: cimage-update           - Update Cimage to latest version.
.PHONY: cimage-update
cimage-update:
	@$(call HELPTEXT,$@)
	composer require mos/cimage
	install -d assets/img assets/cimage cache/cimage
	chmod 777 cache/cimage
	$(ECHO) "$$GIT_IGNORE_FILES" | bash -c 'cat > cache/cimage/.gitignore'
	cp vendor/mos/cimage/webroot/img.php assets/cimage
	touch assets/cimage/img_config.php

# target: cimage-config-create    - Create configfile for Cimage.
.PHONY: cimage-config-create
cimage-config-create:
	@$(call HELPTEXT,$@)
	$(ECHO) "$$CIMAGE_CONFIG" | bash -c 'cat > assets/cimage/img_config.php'
	cat assets/cimage/img_config.php


.PHONY: install-all
install-all: install cimage-install cimage-config-create