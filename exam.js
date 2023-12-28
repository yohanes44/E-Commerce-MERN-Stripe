console.log("jooo");
function findCombinationsFromText(text) {
    function isValidTag(tag) {
        // Check if the tag is a valid prefix
        return prefixes.has(tag);
    }

    function cleanAndSplit(text) {
        // Remove invalid characters and split the string into tags
        const cleanedText = text.replace(/[^a-zA-Z0-9_,\-]/g, '');
        const tags = cleanedText.split(',');
        return tags;
    }

    function validateAndGetCombinations(tags) {
        const combinations = [];
        let currentCombination = [];

        for (const tag of tags) {
            if (isValidTag(tag)) {
                currentCombination.push(tag);
                combinations.push([...currentCombination]);
            } else {
                // Invalid tag encountered, stop processing
                break;
            }
        }

        return combinations;
    }

    // Define the valid prefixes
    const prefixes = new Set(["Group", "Category", "Subcategory", "Make", "Model", "Diagram"]);

    // Clean and split the input text
    const tags = cleanAndSplit(text);

    // Validate and get combinations
    const combinations = validateAndGetCombinations(tags);

    return combinations;
}

// Test cases
console.log(findCombinationsFromText('Group_Electric-Pallet-Jack-Parts, Category_Switches, Subcategory_Ignition-Switch'));
console.log(findCombinationsFromText('--Group_Electric-Pallet-Jack-Parts, Category_Switche@%s-!!Subcategory_Ignition-Switch))@!%'));
console.log(findCombinationsFromText('Category_Switches-Group_Electric-Pallet-Jack-Parts-Subcategory_Ignition-Switch'));
console.log(findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas'));
console.log(findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-Group_Test'));
console.log(findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-WrongPrefix_Test'));
console.log(findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_U-Line-Model_H-1193'));
console.log(findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_Multiton-Model_J'));
console.log(findCombinationsFromText('Make_Atlas-Model_Zenith-Type9-Diagram_Frame'));
console.log(findCombinationsFromText('Group_Tools-&-Hardware'));
console.log(findCombinationsFromText('Group_Electric-Pallet-Jack-Parts-Category_Battery-Subcategory_Battery-Charger-Make_Hyster-Model_B218N26949L-UP'));
