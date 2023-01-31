import mongoose, { Document } from 'mongoose';

enum ColumnColors {
  Red = '#EB5757',
  Green = '#27AE60',
  Yellow = '#F2C94C',
  Blue = '#2D9CDB',
  Orange = '#F2994A',
  Purple = '#9B51E0',
  Grey = '#4F4F4F',
}

export type ColumnDocument = Document & {
  title: string;
  color: ColumnColors;
  taskIds: string[];
};

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [50, 'Title must be at most 50 characters'],
    trim: true,
  },
  color: {
    type: String,
  },
  taskIds: {
    type: Array,
    default: [],
  },
});

export default mongoose.model<ColumnDocument>('Column', columnSchema);
