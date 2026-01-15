import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TenantApi } from '@/api/tenant.api';
import type { Tenant } from '@/data/data.types';

export type TenantState = {
    tenant: Tenant | null;
    tenants: Tenant[];
};

const initialState: TenantState = {
    tenant: null,
    tenants: [],
};

export const getAllTenantAsync = createAsyncThunk(
    'tenant/getAll',
    async () => await TenantApi.getAll()
);

export const tenantState = (state: RootState) => state.tenant;

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        setTenant(
            state,
            action: PayloadAction<Tenant>
        ) {
            state.tenant = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTenantAsync.fulfilled, (state, action) => {
                state.tenants = action.payload
                state.tenant = state.tenants?.[0]
            });
    },
});


export const { setTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
