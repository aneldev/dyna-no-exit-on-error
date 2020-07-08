function getError(cb) {
  try {
    cb();
  }
  catch (e) {
    return e;
  }
}
