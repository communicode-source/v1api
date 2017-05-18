'use strict'

import UserHandler from './../../db/handler/user';
import Response from '../Response';
import Levenshtein from 'fast-levenshtein';

class SearchController  extends Response {
	async search(req, res) {
		const id = req.params.id;
		const dbHandler = new UserHandler();
		let data, statusCode;
		
		id.split("_");

		try {
			if (id.length <= 1) //If not split, search normally
			{
				data = await dbHandler.search(id);
			}
			else //Else, search both items
			{
				data = await dbHandler.dSearch(id);
			}
			const farray = data.map(function(i) { // Array of distance from first names
				return Levenshtein.get(i.fname, id);
			});
			const larray = data.map(function(i) { // Array of distance from last names
				return Levenshtein.get(i.lname, id);
			});
			data.sort(function(item1, item2) {
				let useArray1, useArray2;
				if (farray[data.indexOf(item1)] > larray[data.indexOf(item1)]) // if the item is closer to the first name
				{
					useArray1 = farray;
				}
				else
				{
					useArray1 = larray;
				}

				if (farray[data.indexOf(item2)] > larray[data.indexOf(item2)])
				{
					useArray2 = farray;
				}
				else
				{
					useArray2 = larray;
				}

				return 0 - useArray1[data.indexOf(item1)] + useArray2[data.indexOf(item2)]; // Sort
			});
			statusCode = this.statusCode['success'];
		} catch(err) {
			data = await dbHandler.search(id);
			statusCode = this.statusCode['not found'];
		}

		return new Response(data, statusCode);
	}
};

module.exports = new SearchController();
