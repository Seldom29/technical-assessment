import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { IntegrationServiceApi } from '@/api/integration-service.api';
import type { IntegrationService } from '@/data/data.types';

export type IntegrationServiceState = {
    services: IntegrationService[];
};

const initialState: IntegrationServiceState = {
    services: [],
};

export const getAllIntegrationServicesAsync = createAsyncThunk(
    'integrationService/getAll',
    async () => await IntegrationServiceApi.getAll()
);

export const integrationServiceState = (state: RootState) => state.integrationService;

const integrationServiceSlice = createSlice({
    name: 'integrationService',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllIntegrationServicesAsync.fulfilled, (state, action) => {
                state.services = action.payload
            });
    },
});


export default integrationServiceSlice.reducer;
