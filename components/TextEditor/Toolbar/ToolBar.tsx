'use client';

import { Separator } from '@/components/ui/separator';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Braces,
  Code,
  Italic,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react';
import { AlignMenu } from './AlignMenu';
import HeadingMenu from './HeadingMenu';
import { ToolbarIconButton } from './IconButton';

export const ToolBar = ({ editor }: { editor: Editor | null }) => {
  // Set up portal container on mount

  if (!editor) {
    return null;
  }

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleItalic().run();
  };

  const handleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleUnderline().run();
  };

  const handleCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleCode().run();
  };

  const handleBulletList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleCodeBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleCodeBlock().run();
  };

  // Stop propagation to prevent form submission
  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex items-center space-x-2 px-2" onClick={stopPropagation}>
      <HeadingMenu editor={editor} />
      <ToolbarIconButton
        onClick={handleBold}
        isActive={editor.isActive('bold')}
        title="bold"
      >
        <Bold className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleItalic}
        isActive={editor.isActive('italic')}
        title="italic"
      >
        <Italic className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleUnderline}
        isActive={editor.isActive('underline')}
        title="underline"
      >
        <Underline className="w-4 h-4" />
      </ToolbarIconButton>
      <Separator orientation="vertical" className="h-7" />

      <ToolbarIconButton
        onClick={handleCode}
        isActive={editor.isActive('code')}
        title="code"
      >
        <Code className="w-4 h-4" />
      </ToolbarIconButton>

      <Separator orientation="vertical" className="h-7" />
      <AlignMenu editor={editor} />
      <Separator orientation="vertical" className="h-7" />

      <ToolbarIconButton
        onClick={handleBulletList}
        isActive={editor.isActive('bulletList')}
        title="bullet list"
      >
        <List className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleOrderedList}
        isActive={editor.isActive('orderedList')}
        title="ordered list"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleCodeBlock}
        isActive={editor.isActive('codeBlock')}
        title="code block"
      >
        <Braces className="w-4 h-4" />
      </ToolbarIconButton>
    </div>
  );
};
