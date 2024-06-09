const { exec } = require('node:child_process');

// get args
const args = process.argv;
let [,, version, input, f ] = args;
console.log(version, input, f);

// no input given
if (!input) {
	process.exit();
}

// exec callback
const execFn = (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		process.exit();
	}
	
	console.log(`stdout: ${stdout}`);
	console.error(`stderr: ${stderr}`);
}

try {
	// parse fields
	/*
	const fields = JSON.parse(f);
	const released = version.indexOf('-') !== -1 ? version.substr(0, version.indexOf('-')) : version;
	const v = fields.find(f => f.name === released);
	*/
	
	// parse issues
	input = input.replace(/\]( |\n)\[/gim, '];[').split(';');
	input.forEach(line => {
		const [ gid, issueId, labels ] = JSON.parse(line);
		console.log(gid, issueId, labels);
		
		// comment for BUG (default)
		let comment = 'Die Version `' + version + '` sollte den Fehler beheben - bitte einmal prüfen. Sofern es behoben ist, gerne das Issue schließen.<br /><hr />The version `' + version + '` should fix the bug - please verify. If the bug has been solved, you may close the issue.';
		
		// comment for FEATURE REQUEST
		if (labels.includes('feature :star2:') && !labels.includes('bug :bug:')) {
			comment = 'Dieser Feature Request wurde mit `' + version + '` implementiert. Bitte bestätigen und auf Fehler prüfen. Wenn alles in Ordnung ist, gerne das Issue schließen.<br /><hr />This feature request has been implemented with `' + version + '`. Please verify and test the feature for any bugs. If everything works as expected, you may close the issue.';
		}
		
		// add comment
		exec("gh api graphql -F issueId='" + gid + "' -F comment='" + comment + "' -f query=' \
			mutation UpdateIssue_AddComment($issueId: ID!, $comment: String!) { \
				addComment(input: { \
					body: $comment \
					subjectId: $issueId \
				}) { \
					clientMutationId \
					subject { id } \
				} \
			}'", execFn);
		
		// remove label "#status: implemented-locally" (LA_kwDODbcoCM8AAAABfBUbZQ)
		exec("gh api graphql -F issueId='" + gid + "' -F labelId='LA_kwDODbcoCM8AAAABfBUbZQ' -f query=' \
			mutation UpdateIssue_RemoveLabel($issueId: ID!, $labelId: ID!) { \
				removeLabelsFromLabelable(input: { \
					labelIds: [ $labelId ], \
					labelableId: $issueId \
				}) { \
					clientMutationId, \
					labelable { labels (first: 100) { nodes { name }} } \
				} \
			}'", execFn);
		
		// add label "#status: ready-to-test" (LA_kwDODbcoCM8AAAABfA96zA)
		exec("gh api graphql -F issueId='" + gid + "' -F labelId='LA_kwDODbcoCM8AAAABfA96zA' -f query=' \
			mutation UpdateIssue_AddLabel($issueId: ID!, $labelId: ID!) { \
				addLabelsToLabelable(input: { \
					labelIds: [ $labelId ], \
					labelableId: $issueId \
				}) { \
					clientMutationId, \
					labelable { labels (first: 100) { nodes { name }} } \
				} \
			}'", execFn);
		
		// change project-field `status` to "IN TEST"
		/*
		exec("gh api graphql -F gid='" + gid + "' -F projectId='PVT_kwHOANtAK84AAVGn' -F fieldId='PVTSSF_lAHOANtAK84AAVGnzgALPn8' -F singleSelectOptionId='81737ac4' -f query=' \
			mutation UpdateIssue_ChangeStatus($gid: ID!, $projectId: ID!, $fieldId: ID!, $singleSelectOptionId: String) { \
				updateProjectV2ItemFieldValue(input: { \
					projectId: $projectId, \
					fieldId: $fieldId, \
					value: { singleSelectOptionId: $singleSelectOptionId }, \
					itemId: $gid \
				}) { \
					clientMutationId \
					projectV2Item { \
						content { \
							... on Issue { number id title} \
						} \
						updatedAt \
						type \
					} \
				} \
			}'", execFn);
		*/
		
		// change project-field `released`
		/*
		exec("gh api graphql -F gid='" + gid + "' -F projectId='PVT_kwHOANtAK84AAVGn' -F fieldId='PVTSSF_lAHOANtAK84AAVGnzgILha8' -F singleSelectOptionId='" + v.id + "' -f query=' \
			mutation UpdateIssue_ChangeReleased($gid: ID!, $projectId: ID!, $fieldId: ID!, $singleSelectOptionId: String) { \
				updateProjectV2ItemFieldValue(input: { \
					projectId: $projectId, \
					fieldId: $fieldId, \
					value: { singleSelectOptionId: $singleSelectOptionId }, \
					itemId: $gid \
				}) { \
					clientMutationId \
					projectV2Item { \
						content { \
							... on Issue { number id title} \
						} \
						updatedAt \
						type \
					} \
				} \
			}'", execFn);
		*/
	});
}
catch (error) {
	console.log(error, input);
}
