import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ItemProps } from './Kanban.model';
import styles from './Kanban.module.scss';

const Item = (props: ItemProps) => {
  const { text, index } = props;
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div className={styles.item} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
