"use client";

import { Fragment, useState, useCallback, useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageItem, Position } from "@/types/types";
import Image from "next/image";

interface SouthDragDropGameProps {
  images: ImageItem[];
}

export default function SouthDragDropGame({ images }: SouthDragDropGameProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [hintDialogOpen, setHintDialogOpen] = useState(false);
  const [hintMessage, setHintMessage] = useState("");
  const [hintImageId, setHintImageId] = useState<string | null>(null);
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [positions, setPositions] = useState<Position[]>([
    { id: "position-1", number: 1, imageId: null },
    { id: "position-2", number: 2, imageId: null },
    { id: "position-3", number: 3, imageId: null },
    { id: "position-4", number: 4, imageId: null },
  ]);

  const isValidPosition = useCallback(
    (imageNumber: number, positionNumber: number): boolean => {
      return imageNumber === positionNumber;
    },
    []
  );

  const areAllImagesCorrectlyPlaced = useCallback(
    (positions: Position[]): boolean => {
      const allPositionsFilled = positions.every((pos) => pos.imageId !== null);
      if (!allPositionsFilled) return false;

      return positions.every((pos) => {
        if (!pos.imageId) return false;
        const imageNumber = parseInt(pos.imageId.split("-")[1]);
        return isValidPosition(imageNumber, pos.number);
      });
    },
    [isValidPosition]
  );

  const handleReplay = useCallback(() => {
    setPositions([
      { id: "position-1", number: 1, imageId: null },
      { id: "position-2", number: 2, imageId: null },
      { id: "position-3", number: 3, imageId: null },
      { id: "position-4", number: 4, imageId: null },
    ]);
    setCompletionDialogOpen(false);
  }, []);

  const handleBeforeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const isCorrectlyPlaced = useCallback(
    (imageId: string, currentPositions: Position[]): boolean => {
      const position = currentPositions.find((pos) => pos.imageId === imageId);
      if (!position) return false;
      const imageNumber = parseInt(imageId.split("-")[1]);
      return isValidPosition(imageNumber, position.number);
    },
    [isValidPosition]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false);

      const { destination, source, draggableId } = result;

      if (source.droppableId.startsWith("position-")) {
        if (isCorrectlyPlaced(draggableId, positions)) {
          return;
        }
      }

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (destination.droppableId.startsWith("position-")) {
        const positionId = destination.droppableId;
        const positionNumber = parseInt(positionId.split("-")[1]);
        const imageNumber = parseInt(draggableId.split("-")[1]);

        const targetPosition = positions.find((p) => p.id === positionId);

        if (targetPosition?.imageId) {
          if (isCorrectlyPlaced(targetPosition.imageId, positions)) {
            return;
          }
          if (targetPosition.imageId !== draggableId) {
            return;
          }
        }

        const isCorrect = isValidPosition(imageNumber, positionNumber);

        if (isCorrect) {
          const newPositions = positions.map((pos) => {
            if (pos.id === positionId) {
              return { ...pos, imageId: draggableId };
            }
            if (pos.imageId === draggableId && pos.id !== positionId) {
              return { ...pos, imageId: null };
            }
            return pos;
          });

          setPositions(newPositions);

          if (areAllImagesCorrectlyPlaced(newPositions)) {
            setCompletionDialogOpen(true);
            return;
          }

          if (
            source.droppableId === "images-source" ||
            !source.droppableId.startsWith("position-")
          ) {
            const placedImage = images.find((img) => img.id === draggableId);
            setAlertTitle(placedImage?.alertTitle || "Tốt lắm!");
            setAlertMessage(
              placedImage?.alertMessage || "Làm tốt lắm! Bạn đã đặt đúng rồi!"
            );
            setAlertOpen(true);
          }
        } else {
          const placedImage = images.find((img) => img.id === draggableId);
          if (placedImage?.wrongPositionMessage) {
            setAlertTitle("Chưa đúng!");
            setAlertMessage(placedImage.wrongPositionMessage);
          } else {
            setAlertTitle("Chưa đúng!");
            setAlertMessage("Có vẻ không đúng. Hãy thử vị trí khác!");
          }
          setAlertOpen(true);
        }
      }
      else if (destination.droppableId === "images-source") {
        if (isCorrectlyPlaced(draggableId, positions)) {
          return;
        }

        const newPositions = positions.map((pos) => {
          if (pos.imageId === draggableId) {
            return { ...pos, imageId: null };
          }
          return pos;
        });
        setPositions(newPositions);
      }
    },
    [positions, isValidPosition, areAllImagesCorrectlyPlaced, isCorrectlyPlaced]
  );

  const availableImages = useMemo(() => {
    if (!images || images.length === 0) return [];

    return images.filter((item) => {
      const imageNumber = parseInt(item.id.split("-")[1]);
      const position = positions.find((pos) => pos.imageId === item.id);
      const isCorrectlyPlaced = position
        ? isValidPosition(imageNumber, position.number)
        : false;
      return !isCorrectlyPlaced;
    });
  }, [images, positions, isValidPosition]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/south-game.svg"
          alt="Bantho"
          className="object-cover"
          priority
          fill
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between gap-4 sm:gap-6 md:gap-8 relative z-10">
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={handleBeforeDragStart}
        >
          {/* Images Source Area - Top Center */}
          <div className="w-full flex justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-10">
            <Droppable droppableId="images-source" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`inline-flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 rounded-lg border-2 transition-colors ${
                    snapshot.isDraggingOver
                      ? "border-blue-500 bg-blue-50/90"
                      : "border-gray-300 bg-gray-50/90"
                  }`}
                >
                  {availableImages.map((item, index) => (
                    <div key={item.id} className="relative group">
                      <Draggable
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`transition-all shrink-0 ${
                              snapshot.isDragging
                                ? "opacity-50 scale-95 rotate-2"
                                : "hover:scale-105"
                            }`}
                          >
                            <img
                              src={item.src}
                              alt={`Draggable ${item.id}`}
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain cursor-move rounded-lg shadow-md"
                              draggable={false}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Positions Area - Bottom Center */}
          <div className="w-full max-w-6xl px-6 md:px-14 lg:px-24 pb-[8vh] sm:pb-[10vh] md:pb-[12vh] lg:pb-[14vh] xl:pb-[14vh] flex justify-center">
            <div className="flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 flex-nowrap overflow-visible">
            {positions.map((position) => {
                const isOccupied = !!position.imageId;
                const isLocked = position.imageId
                  ? (() => {
                      const imageNumber = parseInt(
                        position.imageId.split("-")[1]
                      );
                      return isValidPosition(imageNumber, position.number);
                    })()
                  : false;
                const isPosition3 = position.number === 3;
                return (
                  <Fragment key={position.id}>
                    <Droppable
                      droppableId={position.id}
                      isDropDisabled={
                        isLocked || (!!position.imageId && isDragging)
                      }
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`${
                            isPosition3
                              ? "w-36 h-44 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 xl:w-64 xl:h-72"
                              : "w-16 h-44 sm:w-20 sm:h-48 md:w-24 md:h-56 lg:w-32 lg:h-64 xl:w-40 xl:h-72"
                          } shrink-0 rounded-lg border-2 border-dashed relative transition-colors ${
                            snapshot.isDraggingOver
                              ? isLocked
                                ? "border-red-500 cursor-not-allowed"
                                : isOccupied
                                ? "border-red-500 cursor-not-allowed"
                                : "border-green-500"
                              : isLocked
                              ? "border-green-500"
                              : isOccupied
                              ? "border-gray-300"
                              : "border-gray-400"
                          }`}
                        >
                          {position.imageId ? (
                            <Draggable
                              draggableId={position.imageId}
                              index={0}
                              isDragDisabled={isLocked}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...(!isLocked ? provided.dragHandleProps : {})}
                                  className={`absolute inset-0 flex items-center justify-center ${
                                    snapshot.isDragging ? "opacity-50" : ""
                                  } ${
                                    isLocked ? "cursor-default" : "cursor-move"
                                  }`}
                                >
                                  <img
                                    src={
                                      images.find(
                                        (img) => img.id === position.imageId!
                                      )?.src || ""
                                    }
                                    alt={`Position ${position.number}`}
                                    className={`w-full h-full p-1 sm:p-1.5 md:p-2 lg:p-2.5 object-contain rounded-lg ${
                                      isLocked
                                        ? "opacity-100 ring-2 ring-green-500"
                                        : ""
                                    }`}
                                    draggable={false}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {provided.placeholder}
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                    {position.number === 2 && (
                      <div
                        aria-hidden="true"
                        className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 shrink-0"
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </DragDropContext>
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription className="montserrat-400">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setAlertOpen(false)}>
            OK
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={completionDialogOpen}
        onOpenChange={setCompletionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              🎉 Chúc mừng! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Bạn đã đặt thành công tất cả {images.length} hình ảnh vào đúng vị trí!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleReplay}
              size="lg"
              className="w-full sm:w-auto"
            >
              Chơi lại
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={hintDialogOpen} onOpenChange={setHintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              💡 Gợi ý
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {hintMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setHintDialogOpen(false)}
              size="lg"
              className="w-full sm:w-auto"
            >
              Đã hiểu!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

