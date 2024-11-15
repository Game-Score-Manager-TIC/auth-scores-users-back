import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  changeUserStatus,
} from "client/services/features/usersService";

type User = {
  userId: string;
  name: string;
  email: string;
  status: "ACTIVE" | "BLOCKED" | "INACTIVE";
  roles: string[];
  avatar: string;
  // Agrega otros campos según tus necesidades
};

type UsersState = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  total: number; // Total de usuarios en el backend
  page: number; // Página actual
  limit: number; // Límite de usuarios por página
  totalPages: number; // Número total de páginas
};

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  total: 0,
  page: 1,
  limit: 8,
  totalPages: 0,
};

// Thunk para obtener todos los usuarios
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    paginationQuery: { page: number; limit: number; query?: string },
    { getState }
  ) => {
    const token = (getState() as RootState).auth.token;
    const response = await getAllUsers(paginationQuery, token);
    return response;
  }
);

// Thunk para crear un usuario
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => {
    return await createUser(userData);
  }
);

// Thunk para actualizar un usuario
export const modifyUser = createAsyncThunk(
  "users/modifyUser",
  async (args: { userId: string; formData: FormData }, { getState }) => {
    const token = (getState() as RootState).auth.token;
    return await updateUser(args.userId, args.formData, token);
  }
);

// Thunk para obtener un usuario por ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: string, { getState }) => {
    const token = (getState() as RootState).auth.token;
    return await getUserById(userId, token);
  }
);

// Thunk para eliminar un usuario
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId: string, { getState }) => {
    const token = (getState() as RootState).auth.token;
    await deleteUser(userId, token);
    return userId;
  }
);

// Thunk para cambiar el estado de un usuario
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (userId: string, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log("userId", userId, "token", token);

    await changeUserStatus(userId, token);
    return userId;
  }
);

// Slice de usuarios
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Acción para restablecer el estado de los usuarios
    resetUserData: (state) => {
      state.users = [];
      state.status = "idle";
      state.error = null;
      state.total = 0;
      state.page = 1;
      state.limit = 8;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    // Reducers para fetchUsers
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload.data;
      state.total = action.payload.total; // Asigna el total de usuarios
      state.page = action.payload.page; // Asigna la página actual
      state.limit = action.payload.limit; // Asigna el límite por página
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error al obtener usuarios";
    });

    // Reducers para addUser
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });

    // Reducers para modifyUser
    builder.addCase(modifyUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (index !== -1) state.users[index] = action.payload;
    });

    // Reducers para fetchUserById
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (index === -1) {
        state.users.push(action.payload);
      } else {
        state.users[index] = action.payload;
      }
    });

    // Reducers para removeUser
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload
      );
    });

    // Reducers para toggleUserStatus
    builder.addCase(toggleUserStatus.fulfilled, (state, action) => {
      const user = state.users.find((user) => user.userId === action.payload);
      if (user) user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    });
  },
});

// Exportar la acción para usarla en otros lugares
export const { resetUserData } = usersSlice.actions;

// Selectores
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectTotalPages = (state: RootState) => state.users.totalPages;
export const selectCurrentPage = (state: RootState) => state.users.page;
export const selectTotalUsers = (state: RootState) => state.users.total;
export const selectLimit = (state: RootState) => state.users.limit;
export const selectUserById = (userId: string) => (state: RootState) =>
  state.users.users.find((user) => user.userId === userId);

// Exporta el reducer
export default usersSlice.reducer;
