#!/usr/bin/env node

// Script to help identify unused imports and variables in TypeScript files
// This is for demonstration purposes to show what needs to be fixed

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Get list of TS6133 errors from the TypeScript compiler
exec('tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    const unusedErrors = stderr
      .toString()
      .split('\n')
      .filter(line => line.includes('TS6133'))
      .map(line => {
        const match = line.match(/(.+\.tsx?):(\d+):(\d+) - error TS6133: '(.+)' is declared but its value is never read/);
        if (match) {
          return {
            file: match[1],
            line: parseInt(match[2], 10),
            column: parseInt(match[3], 10),
            variable: match[4]
          };
        }
        return null;
      })
      .filter(Boolean);

    console.log('=== Unused Import/Variable Report ===');
    console.log(`${unusedErrors.length} total issues found\n`);

    // Group by file
    const fileGroups = {};
    unusedErrors.forEach(error => {
      if (!fileGroups[error.file]) {
        fileGroups[error.file] = [];
      }
      fileGroups[error.file].push(error);
    });

    // Print report by file
    Object.keys(fileGroups).forEach(file => {
      console.log(`\nFile: ${file}`);
      console.log('Unused variables/imports:');
      fileGroups[file].forEach(error => {
        console.log(`  - Line ${error.line}: '${error.variable}'`);
      });
    });

    console.log('\n=== Instructions ===');
    console.log('To fix these issues:');
    console.log('1. Remove unused imports');
    console.log('2. Add underscore prefix (_) to unused function parameters');
    console.log('3. Use destructuring to exclude unused properties');
    console.log('4. Add "// eslint-disable-next-line @typescript-eslint/no-unused-vars" for variables you need to keep');
  } else {
    console.log('No TypeScript errors found!');
  }
}); 