

class Response {
  constructor(data = [], status = 404) {
    this.data = data;
    this.status = status;

    this.statusCode = {
      'success': 200,
      'not found': 404,
      'cached': 304,
      'redirect': 301,
      'error': 500
    }
  }

  getStatusCode() {
    return this.status;
  }

  getJSONData() {
    return this.data;
  }
}

export default Response;
