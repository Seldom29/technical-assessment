import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { IntegrationConnectionApi } from '@/api/integration-connection.api';
import type { PaginationConfig } from '@/api';
import type { IntegrationConnection } from '@/data/data.types';

export type IntegrationConnectionState = {
    connections: IntegrationConnection[];
};

const initialState: IntegrationConnectionState = {
    connections: [],
};

export const getManyIntegrationConnectionsAsync = createAsyncThunk(
    'integrationConnection/getAll',
    async (pagination: PaginationConfig) => await IntegrationConnectionApi.getMany(pagination)
);

export const integrationConnectionState = (state: RootState) =>
    state.integrationConnection;

const integrationConnectionSlice = createSlice({
    name: 'integrationConnection',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getManyIntegrationConnectionsAsync.fulfilled,
            (state, action) => {
                const { list } = action.payload
                state.connections = list;
            }
        );
    },
});

export default integrationConnectionSlice.reducer;
