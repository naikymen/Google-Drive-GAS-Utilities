# driveFolderCopy
I reused the code here, adapted for my needs: https://ctrlq.org/code/19979-copy-folders-drive. Differences are that this works. Initially i could not get it to work without modification.

# Usage v0.1 (Simple Copy)
1. Check that it will do what you need.
2. Make your own google apps script, copy the contents into it.
3. Replace the source and target folder ID's with the ones that suit you.
4. Optional: change the added string to the copied folder.
5. Give it permissions and run it.

# Usage v0.2 (Triggered Copy)
I made this because of execution timeouts for large folders. It automatically grabs all (small) folders in the desired (heavy) folder and copies them to the (target) folder of your choice. The system is implemented as proposed in stackexchange, but using a spreadsheet to track progress and log errors. It also removes (inmensely annoying) diacritics from file and folder names.
1. Check that it will do what you need.
2. Make your own google apps script, copy the contents into it.
3. Make your own google spreadsheet (and put a 0 in the first row).
4. Get it's ID and put it into the script.
5. Replace the source and target folder ID's with the ones that suit you.
6. Give it permissions (for reading and/or writing) and run it.

# Alternatives
Use the Chrome OS file manager, it is much simpler if you can use it on your computer.
I know no other ways to do this than installing Chrome OS, which may not be simpler at all.

# Warnings
I have not tested this thoroughly with large folders and many files, only as much as 300 files per run, but not always.

# Would like to do, but don´t know how
Have it work from the contextual menu that appears in the drive web interface, i.e. Right Click a folder > "Open With" > "Connect more apps".
