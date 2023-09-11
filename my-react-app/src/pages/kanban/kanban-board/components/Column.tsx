import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { ColumnProps } from '../Kanban.model';
import styles from '../Kanban.module.scss';
import { PlusOutlined } from '@ant-design/icons';

interface IProps {
  col: ColumnProps;
}
const Column = (props: IProps) => {
  const { col } = props;
  return (
    <>
      <Droppable droppableId={col.id}>
        {(provided) => (
          <div className={styles.column}>
            <h2>{col.name}</h2>
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {col.list.map((text, index) => (
                <Item key={text} text={text} index={index} />
              ))}
              {provided.placeholder}
              <div className={styles.create}>
                <PlusOutlined /> Create new
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
