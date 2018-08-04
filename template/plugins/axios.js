export default function({ $axios, error }) {
  $axios.onError(_error => {
    const code = parseInt(_error.response && _error.response.status, 10);
    if (code === 400) {
      return error({ message: 'Bad request.', statusCode: 400 });
    } else if (code === 500) {
      return error({ message: 'Internal server error.', statusCode: 500 });
    }
  });
}
