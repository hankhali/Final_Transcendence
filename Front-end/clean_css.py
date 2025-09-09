#!/usr/bin/env python3
import re
import os

def load_used_classes():
    """Load the list of actually used classes"""
    used_classes = set()
    try:
        with open('used_classes_clean.txt', 'r') as f:
            for line in f:
                cls = line.strip()
                if cls and not cls.startswith('${') and cls not in ['===', 'className', 'type']:
                    used_classes.add(cls)
    except FileNotFoundError:
        print("Error: used_classes_clean.txt not found")
        return set()
    
    # Add common selectors that should be kept
    keep_selectors = {
        '*', 'html', 'body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
        'p', 'a', 'button', 'input', 'select', 'textarea', 'label',
        'ul', 'li', 'div', 'span', 'img', 'form', 'table', 'th', 'td'
    }
    used_classes.update(keep_selectors)
    
    return used_classes

def should_keep_rule(selector, used_classes):
    """Determine if a CSS rule should be kept"""
    selector = selector.strip()
    
    # Always keep certain rules
    if any(selector.startswith(prefix) for prefix in [
        '@', ':root', '*', 'html', 'body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'a', 'button', 'input', 'select', 'textarea', 'label', 'form',
        'table', 'th', 'td', 'ul', 'li', 'div', 'span', 'img'
    ]):
        return True
    
    # Keep keyframes, media queries, and pseudo-selectors
    if any(keyword in selector for keyword in [
        '@keyframes', '@media', ':', '>', '+', '~', '[', ']', 
        'hover', 'focus', 'active', 'before', 'after', 'first-child', 'last-child'
    ]):
        return True
    
    # Check if any class in the selector is used
    class_matches = re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', selector)
    if class_matches:
        return any(cls in used_classes for cls in class_matches)
    
    # Check if it's an ID selector that might be used
    id_matches = re.findall(r'#([a-zA-Z][a-zA-Z0-9_-]*)', selector)
    if id_matches:
        # Keep common IDs
        return any(id_name in ['app', 'root', 'starfield'] for id_name in id_matches)
    
    return True  # Default to keeping the rule if unsure

def clean_css():
    """Remove unused CSS rules from the style.css file"""
    used_classes = load_used_classes()
    
    if not used_classes:
        print("No used classes found. Aborting.")
        return
    
    css_file = 'src/styles/style.css'
    try:
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
    except FileNotFoundError:
        print(f"Error: {css_file} not found")
        return
    
    print(f"Original CSS file: {len(css_content.splitlines())} lines")
    
    # Split CSS into sections (comments, rules, etc.)
    lines = css_content.split('\n')
    cleaned_lines = []
    current_rule = []
    in_rule = False
    brace_count = 0
    skip_rule = False
    
    for line in lines:
        stripped_line = line.strip()
        
        # Always keep comments and empty lines
        if stripped_line.startswith('/*') or stripped_line.startswith('*') or stripped_line == '' or stripped_line.startswith('@import'):
            if not in_rule:
                cleaned_lines.append(line)
            continue
        
        # Handle CSS rules
        if '{' in line:
            in_rule = True
            brace_count += line.count('{')
            current_rule.append(line)
            
            # Check if we should keep this rule
            if len(current_rule) == 1:  # First line of rule contains selector
                selector = re.sub(r'\s*\{.*', '', current_rule[0]).strip()
                skip_rule = not should_keep_rule(selector, used_classes)
                
        elif in_rule:
            current_rule.append(line)
            brace_count += line.count('{')
            brace_count -= line.count('}')
            
            if brace_count <= 0:
                # End of rule
                if not skip_rule:
                    cleaned_lines.extend(current_rule)
                    cleaned_lines.append('')  # Add spacing
                
                # Reset for next rule
                current_rule = []
                in_rule = False
                skip_rule = False
                brace_count = 0
        else:
            # Not in a rule, probably a standalone line
            cleaned_lines.append(line)
    
    # Write the cleaned CSS
    cleaned_content = '\n'.join(cleaned_lines)
    
    # Remove excessive empty lines
    cleaned_content = re.sub(r'\n\n\n+', '\n\n', cleaned_content)
    
    # Backup original file
    backup_file = css_file + '.backup'
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # Write cleaned file
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"Cleaned CSS file: {len(cleaned_content.splitlines())} lines")
    print(f"Backup saved as: {backup_file}")
    print(f"Reduction: {len(css_content.splitlines()) - len(cleaned_content.splitlines())} lines removed")

if __name__ == "__main__":
    clean_css()
