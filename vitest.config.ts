/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/main.tsx',
        'src/types/types.ts',
        'src/constants.ts',
        'src/vite-env.d.ts',
        'src/services/api/getListData.ts',
        'src/services/api/getDataByLink.ts',
        'src/components/cards/Film/Film.tsx',
        'src/components/cards/Planet/Planet.tsx',
        'src/components/cards/Specie/Specie.tsx',
        'src/components/cards/Starship/Starship.tsx',
        'src/components/cards/Vehicle/Vehicle.tsx',
        'src/components/cards/Person/Person.tsx',
        'src/context/ListDataProvider.tsx',
      ],
      all: true,
    },
  },
});
