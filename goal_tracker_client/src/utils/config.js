const base_uri = "http://localhost:8082/api/"

const config = {
    base_uri: base_uri,
    api_uri: (str) => {
        if (str.startsWith("/")) {
            str = str.substring(1);
        }
        return base_uri + str
    },
}

export { config };