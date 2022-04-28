image := testcafe_test_image

run_tests: build
	docker run \
		--rm \
		$(image) \
		./run_tests.sh \

build:
	docker build -t $(image) .