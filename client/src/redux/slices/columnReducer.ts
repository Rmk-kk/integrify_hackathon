import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ColumnColors, Columns} from "../../utility/types";
import {ColumnData} from "../../utility/models";

const initialState: ColumnData[] = [
  { id: "column-1",
    title: "Pending",
    taskIds: ["task-1", "task-2"],
    color: ColumnColors.Blue,
  },
  { id: "column-2",
      title: "In Process",
      taskIds: ["task-3"],
      color: ColumnColors.Yellow,
    },
{     id: "column-3",
      title: "On Hold",
      taskIds: [],
      color: ColumnColors.Red,
},
{ id: "column-4",
      title: "Finished",
      taskIds: ["task-5", "task-6","task-4"],
      color: ColumnColors.Green,
}];

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
        updateColumn: (state, action) => {
        const {columnId, newTask} = action.payload;
        const updatedIndex = state.findIndex(c => c.id === columnId);
        return state.map((column, index) => {
            if(index === updatedIndex) {
                return  {...column, taskIds: [...column.taskIds, newTask.id]}
            } else {
                return column
            }
        })
    },
        updateColumnTaskOrder: (state, action) => {
        const {currId, newTasksIds} = action.payload;
        return state.map((column) => {
            if(column.id === currId) {
                return  {...column, taskIds: [...newTasksIds]}
            } else {
                return column
            }
        })
    },
        createNewColumn: (state, action) => {
        return [...state, action.payload];
      },
        removeTaskFromColumn: (state, action) => {
        const {columnId, id} = action.payload;
        const column = state.find(col => col.id === columnId);
        if(column) {
            const oldIds = Array.from(column.taskIds);
            const newIds = oldIds.filter(taskId => taskId !== id);
            console.log(newIds);
            return state.map(c => {
                if(c.id === column.id) {
                    return {...c, taskIds : [...newIds]}
                }
                return c
            })
        }
      },
        removeColumn: (state, action) => {
            return state.filter(column => column.id !== action.payload)
        },
        modifyColumn: (state, action) => {
            return state.map(column => {
                if(column.id === action.payload.id) {
                    return {...column, color:action.payload.color, title: action.payload.title}
                }
                return column
            })
        }
  }
});

const columnReducer = columnSlice.reducer;
export default columnReducer;
export const {modifyColumn, updateColumn, updateColumnTaskOrder, createNewColumn, removeTaskFromColumn, removeColumn} = columnSlice.actions

