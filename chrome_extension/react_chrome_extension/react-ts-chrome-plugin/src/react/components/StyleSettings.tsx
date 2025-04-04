import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { RiSettings4Line } from "@remixicon/react"
import { Button } from './ui/button'
import RadioCards from './RadioCards'
import { HighlightingPatternList, ColoringPatternList } from '../../constants'
import storage from '../../lib/storage'
import { SETTINGS, SettingKeys } from '../../constants'

export default function StyleSettings() {
  const [open, setOpen] = useState(false)
  const [highlighting, setHighlighting] = useState('')
  const [coloring, setColoring] = useState('')

  const handleSave = async () => {
    await storage.set(SETTINGS, {
      [SettingKeys.HIGHLIGHTING_PATTERN]: highlighting,
      [SettingKeys.COLORING_PATTERN]: coloring
    })
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="ml-2"
      >
        <RiSettings4Line className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Style Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Highlighting Pattern</h3>
              <RadioCards
                options={HighlightingPatternList}
                value={highlighting}
                onChange={setHighlighting}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Coloring Pattern</h3>
              <RadioCards
                options={ColoringPatternList}
                value={coloring}
                onChange={setColoring}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}