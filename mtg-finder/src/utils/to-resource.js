const toResource = (promise) => {
  let status = "pending";
  let result;

  const suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }

      if (status === "error") {
        throw result;
      }

      if (status === "success") {
        return result;
      }
    },
  };
};

export default toResource;

