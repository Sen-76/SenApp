import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { ColumnProps } from './Kanban.model';
import styles from './Kanban.module.scss';

const Column = (col: ColumnProps) => {
  const { list, id } = col;
  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className={styles.column}>
            <h2>{id}</h2>
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((text, index) => (
                <Item key={text} text={text} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
