build:
	cd app && npm run build

deploy: build
	npx cdk deploy --require-approval never
