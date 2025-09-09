#!/usr/bin/env python3
import re
import os

def extract_css_selectors(css_content):
    """Extract CSS selectors from CSS content"""
    selectors = set()
    
    # Remove comments
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    
    # Find all CSS rules
    rules = re.findall(r'([^{}]+)\s*\{[^{}]*\}', css_content)
    
    for rule in rules:
        # Split by comma to handle multiple selectors
        rule_selectors = [s.strip() for s in rule.split(',')]
        
        for selector in rule_selectors:
            selector = selector.strip()
            if selector and not selector.startswith('@'):
                # Extract class names from selectors
                class_matches = re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', selector)
                selectors.update(class_matches)
                
                # Also keep track of the full selector for analysis
                selectors.add(selector.replace('.', ''))
    
    return selectors

def load_used_classes():
    """Load the list of actually used classes"""
    used_classes = set()
    try:
        with open('used_classes_clean.txt', 'r') as f:
            for line in f:
                cls = line.strip()
                if cls and not cls.startswith('${'):
                    used_classes.add(cls)
    except FileNotFoundError:
        print("Error: used_classes_clean.txt not found. Run extract_classes.py first.")
        return set()
    
    return used_classes

def analyze_css_usage():
    """Analyze which CSS classes are not being used"""
    
    # Load used classes
    used_classes = load_used_classes()
    if not used_classes:
        return
    
    print(f"Found {len(used_classes)} used classes")
    
    # Read CSS file
    css_file = 'src/styles/style.css'
    try:
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
    except FileNotFoundError:
        print(f"Error: {css_file} not found")
        return
    
    # Extract CSS selectors
    css_selectors = extract_css_selectors(css_content)
    
    print(f"Found {len(css_selectors)} CSS selectors")
    
    # Find unused classes
    unused_classes = css_selectors - used_classes
    
    # Filter out pseudo-classes, media queries, and other valid selectors that might not be in our used list
    valid_unused = set()
    for cls in unused_classes:
        # Skip if it's a pseudo-class or contains special characters that might be valid
        if not any(char in cls for char in [':', '>', '+', '~', '[', ']', '(', ')']):
            valid_unused.add(cls)
    
    print(f"\nPotentially unused CSS classes ({len(valid_unused)}):")
    print("=" * 60)
    for cls in sorted(valid_unused):
        print(cls)
    
    # Find used classes that might be missing from CSS
    missing_in_css = used_classes - css_selectors
    
    print(f"\nClasses used in code but not found in CSS ({len(missing_in_css)}):")
    print("=" * 60)
    for cls in sorted(missing_in_css):
        print(cls)
    
    # Save results
    with open('css_analysis.txt', 'w') as f:
        f.write("POTENTIALLY UNUSED CSS CLASSES:\n")
        f.write("=" * 40 + "\n")
        for cls in sorted(valid_unused):
            f.write(cls + '\n')
        
        f.write("\n\nCLASSES USED IN CODE BUT NOT IN CSS:\n")
        f.write("=" * 40 + "\n")
        for cls in sorted(missing_in_css):
            f.write(cls + '\n')

if __name__ == "__main__":
    analyze_css_usage()
