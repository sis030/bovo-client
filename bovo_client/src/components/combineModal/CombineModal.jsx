import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { 
  DndContext, 
  closestCenter, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  MouseSensor
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";

class CustomTouchSensor extends TouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart',
      handler: ({ nativeEvent: event }) => {
        if (!event.target.closest('[data-drag-handle="true"]')) {
          return false;
        }

        return true;
      },
    },
  ];
}

const CombineModal = ({ open, onClose, memos, setMemos }) => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  // 원본 메모를 복제해서 저장하는 상태 추가
  const [originalMemos, setOriginalMemos] = useState([]);

  useEffect(() => {
    if (memos && Array.isArray(memos) && memos.length > 0) {
      // 원본 메모 상태를 저장
      setOriginalMemos([...memos]);
      setItems([...memos]);
    } else {
      setOriginalMemos([]);
      setItems([]);
    }
  }, [memos]);

  const sensors = useSensors(
    /*마우스용 */
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),

    useSensor(CustomTouchSensor, {
      activationConstraint: {
        delay: 100, // 실수로 드래그되는 거 방지
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    console.log("Drag started:", event);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    console.log("Drag ended:", event);
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(active.id)
        );
        const newIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(over.id)
        );
        // 로컬 상태만 변경하고 부모 컴포넌트에는 아직 변경 사항을 알리지 않음
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    console.log("Drag cancelled");
    setActiveId(null);
  };

  // 정렬하기 버튼 클릭 시 실행되는 함수
  const handleApplyOrder = () => {
    // 정렬된 아이템을 부모 컴포넌트에 전달
    setMemos(items);
    onClose();
  };

  // 취소 시 원래 순서로 돌아가기
  const handleCancel = () => {
    // 원본 메모 상태로 복원하고 모달을 닫음
    setItems(originalMemos);
    onClose();
  };

  if (!open) return null;

  const activeItem = items.find(item => String(item.memo_id) === String(activeId));

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={handleCancel} // 배경 클릭 시 취소 동작
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "95%", sm: "43rem" },
          height: { xs: "80%", sm: "55rem" },
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, fontWeight: "bold" }}>순서 변경하기</Typography>
          <IconButton onClick={handleCancel}><CloseIcon /></IconButton>
        </Box>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext 
            items={items.map((item) => String(item.memo_id))} 
            strategy={verticalListSortingStrategy}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "34rem" },
                height: { xs: "calc(100% - 8rem)", sm: "45rem" },
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                touchAction: "auto",
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "-ms-autohiding-scrollbar"
              }}
            >
              {items.map((memo) => (
                <SortableItem key={memo.memo_id} memo={memo} />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableItem memo={activeItem} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>

        <Button
          variant="contained"
          disableElevation
          onClick={handleApplyOrder} // 정렬하기 버튼에 함수 연결
          sx={{
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            borderRadius: "1.25rem",
            width: { xs: "8rem", sm: "10rem" },
            height: { xs: "2.5rem", sm: "3rem" },
            "&:hover": {
              backgroundColor: "#5a7fad",
            },
          }}
        >
          정렬하기
        </Button>
      </Paper>
    </Box>
  );
};

const SortableItem = ({ memo, isDragging }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging: isSorting 
  } = useSortable({ 
    id: String(memo.memo_id) 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSorting ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        width: { xs: "100%", sm: "34rem" },
        height: { xs: "auto", sm: "8rem" },
        minHeight: "6rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: "white",
        boxSizing: "border-box",
        touchAction: "auto",
      }}
    >
      <Box sx={{ width: "90%" }}>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: "bold" }}>
          {memo.memo_Q || "제목 없음"}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, color: "gray" }}>
          기록 작성 일 : {memo.memo_date || "YY.MM.DD"}
        </Typography>
      </Box>

      <IconButton 
        {...listeners} 
        {...attributes} 
        sx={{ cursor: "grab" }}
        data-drag-handle="true"
      >
        <DragHandleIcon sx={{ color: "gray" }} />
      </IconButton>
    </Paper>
  );
};

export default CombineModal;