import { useState, useEffect } from 'react';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './Kanban.module.scss';
import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { HddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const initialColumns = {
  todo: {
    id: 'todo',
    name: 'Open',
    list: ['item 1', 'item 2', 'item 3']
  },
  doing: {
    id: 'doing',
    name: 'Inprogress',
    list: []
  },
  done: {
    id: 'done',
    name: 'Closed',
    list: []
  }
};
const Kanban = () => {
  const [columns, setColumns] = useState<A>(initialColumns);
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { icon: <HddOutlined />, text: 'Kanban' },
      { path: '/kanban', text: 'Kanban Board' }
    ]);
  }, []);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];
    if (start === end) {
      const newList = start.list.filter((_: A, idx: number) => idx !== source.index);
      newList.splice(destination.index, 0, start.list[source.index]);
      const newCol = {
        id: start.id,
        list: newList
      };
      setColumns((state: A) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      const newStartList = start.list.filter((_: A, idx: number) => idx !== source.index);
      const newStartCol = {
        id: start.id,
        name: start.name,
        list: newStartList
      };
      const newEndList = end.list;
      newEndList.splice(destination.index, 0, start.list[source.index]);
      const newEndCol = {
        id: end.id,
        name: end.name,
        list: newEndList
      };
      setColumns((state: A) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Link to="/kanban/workflow">Workflow</Link>
      <div className={styles.wrap}>
        {Object.values(columns).map((col: A) => (
          <Column col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
