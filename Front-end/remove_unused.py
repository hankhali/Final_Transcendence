#!/usr/bin/env python3
import re

def remove_unused_sections():
    """Remove specific unused sections from CSS"""
    
    with open('src/styles/style.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Sections to remove based on analysis
    sections_to_remove = [
        # Terminal chat section (not used in current codebase)
        r'/\* --- Retro Terminal Chat Styles --- \*/.*?(?=/\*|$)',
        
        # About project section (not used)
        r'/\* About Project Section.*?\*/.*?(?=/\*|$)',
        
        # Features section (not used)
        r'/\* Features Section.*?\*/.*?(?=/\*|$)',
        
        # Voice control button (not used)
        r'/\* Voice Control Button.*?\*/.*?(?=/\*|$)',
        
        # Tournament carousel (not used)
        r'/\* Tournament Types Carousel.*?\*/.*?(?=/\*|$)',
        
        # Specific unused classes
        r'\.about-project.*?\{[^{}]*\}',
        r'\.features-grid.*?\{[^{}]*\}',
        r'\.feature-button.*?\{[^{}]*\}',
        r'\.voice-control-button.*?\{[^{}]*\}',
        r'\.tournament-carousel.*?\{[^{}]*\}',
        r'\.terminal-.*?\{[^{}]*\}',
        r'\.typing-cursor.*?\{[^{}]*\}',
        r'\.welcome-message.*?\{[^{}]*\}',
        r'\.error-message.*?\{[^{}]*\}',
        r'\.info-message.*?\{[^{}]*\}',
        r'\.success-message.*?\{[^{}]*\}',
        r'\.prompt.*?\{[^{}]*\}',
        r'\.card.*?\{[^{}]*\}',
        r'\.btn.*?\{[^{}]*\}',
        r'\.form-control.*?\{[^{}]*\}',
        r'\.form-error.*?\{[^{}]*\}',
        
        # Unused keyframes
        r'@keyframes blink-caret.*?\}',
        r'@keyframes grid-flow.*?\}',
    ]
    
    cleaned_content = css_content
    
    for pattern in sections_to_remove:
        cleaned_content = re.sub(pattern, '', cleaned_content, flags=re.DOTALL)
    
    # Clean up excessive whitespace
    cleaned_content = re.sub(r'\n\s*\n\s*\n+', '\n\n', cleaned_content)
    cleaned_content = re.sub(r'/\*\s*\*/\s*', '', cleaned_content)  # Remove empty comments
    
    # Backup original
    with open('src/styles/style.css.backup2', 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # Write cleaned version
    with open('src/styles/style.css', 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    original_lines = len(css_content.splitlines())
    cleaned_lines = len(cleaned_content.splitlines())
    
    print(f"Original: {original_lines} lines")
    print(f"Cleaned: {cleaned_lines} lines")
    print(f"Removed: {original_lines - cleaned_lines} lines")
    print(f"Reduction: {((original_lines - cleaned_lines) / original_lines) * 100:.1f}%")

if __name__ == "__main__":
    remove_unused_sections()
