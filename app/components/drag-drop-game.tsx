'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export interface ImageItem {
  id: string
  src: string
}

interface Position {
  id: string
  number: number
  imageId: string | null
}

interface DragDropGameProps {
  images: ImageItem[]
}

export default function DragDropGame({ images }: DragDropGameProps) {
  const [positions, setPositions] = useState<Position[]>([
    { id: 'position-1', number: 1, imageId: null },
    { id: 'position-2', number: 2, imageId: null },
    { id: 'position-3', number: 3, imageId: null },
    { id: 'position-4', number: 4, imageId: null },
    { id: 'position-5', number: 5, imageId: null },
  ])

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Memoized validation function
  const isValidPosition = useCallback((imageNumber: number, positionNumber: number): boolean => {
    if (imageNumber === 1 || imageNumber === 5) {
      return positionNumber === 1 || positionNumber === 5
    }
    return imageNumber === positionNumber
  }, [])

  // Memoized check for both special images
  const areBothImagesCorrectlyPlaced = useCallback((positions: Position[]): boolean => {
    const image1Position = positions.find((pos) => pos.imageId === 'image-1')
    const image5Position = positions.find((pos) => pos.imageId === 'image-5')
    
    const image1Correct = image1Position 
      ? isValidPosition(1, image1Position.number)
      : false
    const image5Correct = image5Position 
      ? isValidPosition(5, image5Position.number)
      : false
    
    return image1Correct && image5Correct
  }, [isValidPosition])

  // Memoized check for all images
  const areAllImagesCorrectlyPlaced = useCallback((positions: Position[]): boolean => {
    const allPositionsFilled = positions.every((pos) => pos.imageId !== null)
    if (!allPositionsFilled) return false

    return positions.every((pos) => {
      if (!pos.imageId) return false
      const imageNumber = parseInt(pos.imageId.split('-')[1])
      return isValidPosition(imageNumber, pos.number)
    })
  }, [isValidPosition])

  // Reset game handler
  const handleReplay = useCallback(() => {
    setPositions([
      { id: 'position-1', number: 1, imageId: null },
      { id: 'position-2', number: 2, imageId: null },
      { id: 'position-3', number: 3, imageId: null },
      { id: 'position-4', number: 4, imageId: null },
      { id: 'position-5', number: 5, imageId: null },
    ])
    setCompletionDialogOpen(false)
  }, [])

  // onBeforeDragStart - block state updates during drag (best practice)
  const handleBeforeDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  // onDragEnd - synchronous state update (required by library)
  const onDragEnd = useCallback((result: DropResult) => {
    setIsDragging(false)
    
    const { destination, source, draggableId } = result

    // No destination
    if (!destination) return

    // Dropped in same place
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) {
      return
    }

    // Dropping on a position
    if (destination.droppableId.startsWith('position-')) {
      const positionId = destination.droppableId
      const positionNumber = parseInt(positionId.split('-')[1])
      const imageNumber = parseInt(draggableId.split('-')[1])

      // Check if position is already occupied (and it's not the source position)
      const targetPosition = positions.find((p) => p.id === positionId)
      
      if (targetPosition?.imageId && targetPosition.imageId !== draggableId) {
        return // Position occupied by different image, prevent drop
      }

      // Validate position
      const isCorrect = isValidPosition(imageNumber, positionNumber)

      if (isCorrect) {
        // Correct position - synchronously update state
        const newPositions = positions.map((pos) => {
          if (pos.id === positionId) {
            return { ...pos, imageId: draggableId }
          }
          // Remove image from other positions (if dragging from another position)
          if (pos.imageId === draggableId && pos.id !== positionId) {
            return { ...pos, imageId: null }
          }
          return pos
        })
        
        setPositions(newPositions)
        
        // Check completion after state update
        if (areAllImagesCorrectlyPlaced(newPositions)) {
          setCompletionDialogOpen(true)
          return
        }
        
        // Handle alert messages (only show for new placements, not repositions)
        if (source.droppableId === 'images-source' || !source.droppableId.startsWith('position-')) {
          if (imageNumber === 1 || imageNumber === 5) {
            if (areBothImagesCorrectlyPlaced(newPositions)) {
              setAlertTitle('Excellent!')
              setAlertMessage('Both Image 1 and Image 5 are correctly placed in positions 1 and 5!')
              setAlertOpen(true)
            }
          } else {
            setAlertTitle('Good!')
            setAlertMessage(`Image ${imageNumber} is in the correct position ${positionNumber}!`)
            setAlertOpen(true)
          }
        }
      } else {
        // Wrong position - show alert but don't update positions
        setAlertTitle("That's Bad!")
        const validPositions = imageNumber === 1 || imageNumber === 5 
          ? 'position 1 or 5' 
          : `position ${imageNumber}`
        setAlertMessage(`Image ${imageNumber} should be in ${validPositions}, not position ${positionNumber}.`)
        setAlertOpen(true)
      }
    }
    // Dropping back to source
    else if (destination.droppableId === 'images-source') {
      const newPositions = positions.map((pos) => {
        if (pos.imageId === draggableId) {
          return { ...pos, imageId: null }
        }
        return pos
      })
      setPositions(newPositions)
    }
  }, [positions, isValidPosition, areBothImagesCorrectlyPlaced, areAllImagesCorrectlyPlaced])

  // Memoize available images list
  const availableImages = useMemo(() => {
    if (!images || images.length === 0) return []
    
    return images.filter((item) => {
      const imageNumber = parseInt(item.id.split('-')[1])
      const position = positions.find((pos) => pos.imageId === item.id)
      const isCorrectlyPlaced = position 
        ? isValidPosition(imageNumber, position.number)
        : false
      return !isCorrectlyPlaced
    })
  }, [images, positions, isValidPosition])

  return (    
    <>
      <div className="w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between relative">
        <DragDropContext 
          onDragEnd={onDragEnd}
          onBeforeDragStart={handleBeforeDragStart}
        >
          {/* Positions Area - Positioned on the table */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 md:px-12 lg:px-16 pb-[6vh] sm:pb-[8vh] md:pb-[10vh] lg:pb-[12vh] xl:pb-[14vh] z-20">
            <div className="flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 flex-nowrap overflow-visible">
              {positions.map((position) => (
                <Droppable 
                  key={position.id}
                  droppableId={position.id}
                  isDropDisabled={!!position.imageId && isDragging}
                >
                  {(provided, snapshot) => {
                    const isOccupied = !!position.imageId
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 rounded-lg border-2 border-dashed relative transition-colors ${
                          snapshot.isDraggingOver
                            ? isOccupied
                              ? 'border-red-500 cursor-not-allowed'
                              : 'border-green-500'
                            : isOccupied
                            ? 'border-gray-300'
                            : 'border-gray-400'
                        }`}
                      >
                        {position.imageId ? (
                          <Draggable 
                            draggableId={position.imageId} 
                            index={0}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`absolute inset-0 flex items-center justify-center ${
                                  snapshot.isDragging ? 'opacity-50' : ''
                                }`}
                              >
                                <img
                                  src={images.find((img) => img.id === position.imageId!)?.src || ''}
                                  alt={`Position ${position.number}`}
                                  className="w-full h-full p-1 sm:p-1.5 md:p-2 lg:p-2.5 object-contain rounded-lg"
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
                    )
                  }}
                </Droppable>
              ))}
            </div>
          </div>

          {/* Images Source Area - Right Side */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 z-20">
            <Droppable 
              droppableId="images-source" 
              direction="vertical"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 rounded-lg border-2 min-h-[150px] sm:min-h-[180px] md:min-h-[200px] transition-colors ${
                    snapshot.isDraggingOver
                      ? 'border-blue-500 bg-blue-50/90'
                      : 'border-gray-300 bg-gray-50/90'
                  }`}
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-center">
                    Drag Images
                  </h3>
                  {availableImages.map((item, index) => (
                    <Draggable 
                      key={item.id} 
                      draggableId={item.id} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-all ${
                            snapshot.isDragging ? 'opacity-50 scale-95 rotate-2' : 'hover:scale-105'
                          }`}
                        >
                          <img
                            src={item.src}
                            alt={`Draggable ${item.id}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain cursor-move rounded-lg shadow-md mx-auto"
                            draggable={false}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setAlertOpen(false)}>OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Completion Dialog */}
      <Dialog open={completionDialogOpen} onOpenChange={setCompletionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">🎉 Congratulations! 🎉</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              You have successfully placed all 5 images in their correct positions!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleReplay} size="lg" className="w-full sm:w-auto">
              Replay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}