build:
	cd app && npm run build

deploy: build
	cdk deploy
