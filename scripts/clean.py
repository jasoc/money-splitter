import os
import glob
import shutil


os.chdir(os.path.join(os.path.dirname(__file__), '..'))

to_remove = [
    'node_modules',
    'dist',
    '*.log',
]


def main():
    for to_match in to_remove:
        matched_lst = glob.glob(os.path.join('**', to_match), recursive=True)
        for matched in matched_lst:

            if os.path.isdir(matched):
                print(f'removing {matched}')
                shutil.rmtree(matched)

            if os.path.isfile(matched):
                print(f'removing {matched}')
                os.remove(matched)


if __name__ == '__main__':
    main()
