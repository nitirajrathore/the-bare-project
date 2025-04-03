/**
 * Manages the selection of checkboxes based on data-short-names and a maximum selection limit.
 * @param {string[]} dataNames - An array of data-short-names of checkboxes to select.
 * @param {number} maxSelected - The maximum number of checkboxes that can be selected.
 * explanation: "The manageCheckboxSelection function now dynamically finds the currently selected checkboxes. It creates a canBeDeselectedList, which contains checkboxes that are selected but not in the dataNames list. It then iterates through dataNames, selecting checkboxes. If maxSelected is exceeded, it deselects checkboxes from canBeDeselectedList. The function applies the changes to the DOM and dispatches the 'change' event on each modified checkbox."

 */
async function manageCheckboxSelection(dataNames, maxSelected) {
  if (!Array.isArray(dataNames) || typeof maxSelected !== 'number') {
    console.error('Invalid input parameters.');
    return;
  }

  // 1. Find currently selected checkboxes
  const currentlySelectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

  // 2. Create canBeDeselectedList
  const canBeDeselectedList = currentlySelectedCheckboxes.filter(checkbox => {
    const parent = checkbox.parentElement;
    return !(parent && 
        parent.tagName.toLowerCase() === 'label' && 
        parent.hasAttribute('data-short-name') && 
        dataNames.includes(parent.getAttribute('data-short-name')));
  });

  // All Checkboxes
  const checkboxes = Array.from(document.querySelectorAll(`input[type="checkbox"]`));

  // 3. Iterate and select/deselect
  let selectedCount = currentlySelectedCheckboxes.length;
  for (const dataName of dataNames) {
    // get checkbox with data-short-name
    const checkbox = getCheckboxWithDataName(dataName, checkboxes);
    if (checkbox) {
      if (!checkbox.checked) {
        // Select the checkbox
        await setElementStyles(checkbox, {
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
        });
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        await setElementStyles(checkbox, {
          opacity: 1,
          transition: 'opacity 0.3s ease',
        });
      }
      selectedCount++;

      // Deselect from canBeDeselectedList if needed
      if (selectedCount > maxSelected) {
        const checkboxToDeselect = canBeDeselectedList.shift();
        if (checkboxToDeselect) {
          await setElementStyles(checkboxToDeselect, {
            opacity: 0.5,
            transition: 'opacity 0.3s ease',
          });
          checkboxToDeselect.checked = false;
          checkboxToDeselect.dispatchEvent(new Event('change', { bubbles: true }));
          await setElementStyles(checkboxToDeselect, {
            opacity: 1,
            transition: 'opacity 0.3s ease',
          });
        }
        selectedCount--;
      }
    } else {
      console.error(`Checkbox with data-short-name "${dataName}" not found.`);
    }
  }
}



/**
 * Selects or deselects checkboxes based on their data-short-name attribute.
 * @param {string[]} dataNames - An array of data-short-name values of the checkboxes to toggle.
 * @param {boolean} checked - Whether to select (true) or deselect (false) the checkboxes.
 */
async function toggleCheckboxesByDataName(dataNames, checked) {
  if (!Array.isArray(dataNames)) {
    console.error('dataNames must be an array.');
    return;
  }

  for (const dataName of dataNames) {
    const checkbox = document.querySelector(`input[type="checkbox"][data-short-name="${dataName}"]`);
    if (checkbox) {
      if (checkbox.checked !== checked) {
        await setElementStyles(checkbox, {
          opacity: 0.5,
          transition: 'opacity 0.3s ease'
        });
        checkbox.checked = checked;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        await setElementStyles(checkbox, {
          opacity: 1,
          transition: 'opacity 0.3s ease'
        });
      }
    } else {
      console.error(`Checkbox with data-short-name "${dataName}" not found.`);
    }
  }
}

/**
 * Deselects all checkboxes on the page.
 */
async function deselectAllCheckboxes() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of allCheckboxes) {
    if (checkbox.checked) {
      await setElementStyles(checkbox, {
        opacity: 0.5,
        transition: 'opacity 0.3s ease'
      });
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      await setElementStyles(checkbox, {
        opacity: 1,
        transition: 'opacity 0.3s ease'
      });
    }
  }
}


async function setElementStyles(el, styles) {
  return new Promise((resolve) => {
    if (!el || !(el instanceof Element)) {
      console.error('setElementStyles: Invalid element provided.');
      resolve();
      return;
    }
    if (!styles || typeof styles !== 'object') {
      console.error('setElementStyles: Invalid styles object provided.');
      resolve();
      return;
    }

    Object.assign(el.style, styles);

    // Ensure the style changes are applied before resolving
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

export { manageCheckboxSelection, toggleCheckboxesByDataName, deselectAllCheckboxes };

/**
 * Gets a checkbox element with the specified data-short-name attribute.
 * @param {string} dataName - The data-short-name value to search for.
 * @param {NodeListOf<Element>} checkboxes - The list of checkboxes to search through.
 * @returns {HTMLInputElement | null} - The found checkbox element or null if not found.
 */
function getCheckboxWithDataName(dataName: string, checkboxes: Element[]): HTMLInputElement | null {
  for (const checkbox of checkboxes) {
    const parent = checkbox.parentElement;
    if (parent && parent.getAttribute('data-short-name') === dataName) {
      return checkbox as HTMLInputElement;
    }
  }
  return null;
}
