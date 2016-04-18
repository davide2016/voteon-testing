exports.config = {
  directConnect: true,
    framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['voteon-spec.js']
};
