import os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

to_remove = [
    'node_modules',
    'dist',
]

def main():
    for element in os.listdir():
        if os.path.isdir(element) and element in to_remove:
            os.remove(element)

if __name__ == '__main__':
    main()