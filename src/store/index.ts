import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

import navReducer from './slices/nav.slice';
import tenantReducer from './slices/tenant.slice';
import integrationServiceReducer from './slices/integration-service.slice';
import integrationConnectionReducer from './slices/integration-connection.slice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    tenant: tenantReducer,
    integrationService: integrationServiceReducer,
    integrationConnection: integrationConnectionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
