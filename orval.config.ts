import { defineConfig } from 'orval';

export default defineConfig({
  'employee-orval': {
    input: 'http://localhost:5133/swagger/v1/swagger.json',
    output: {
      schemas: 'generated/api',
    },
  },
});
