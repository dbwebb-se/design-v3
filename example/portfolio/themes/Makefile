#!/usr/bin/env make

ACTIVE_THEMES = default sts


.PHONY: theme
theme:
	@for theme_dir in $(ACTIVE_THEMES) ; do $(npm run node-sass "$$theme_dir"/scss/style.scss "$$theme_dir"/css/styleS.css) ; done
