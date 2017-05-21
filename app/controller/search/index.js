'use strict'

import UserHandler from './../../db/handler/user';
import Response from '../Response';
import Levenshtein from 'fast-levenshtein';

class SearchController  extends Response {
	async search(req, res) {
		const id = req.params.id;
		const dbHandler = new UserHandler();
		let data, statusCode;
		

		try {
			let farray, larray, oarray;
			if (!id.includes('_')) // Search single name
			{
				data = await dbHandler.search(id);
				farray = data.map(function(i) { // Array of distance from first names
					return Levenshtein.get(i.fname, id);
				});
				larray = data.map(function(i) { // Array of distance from last names
					return Levenshtein.get(i.lname, id);
				});
				oarray = data.map(function(i) { // Array of distance from organization names
					if (i.organizationname != null)
					{
						return Levenshtein.get(i.oranizationname, id);
					}
					else
					{
						return 100;
					}
				});

			}
			else // Search both names
			{
				let idArray = id.split("_");
				data = await dbHandler.dSearch(idArray);
				farray = data.map(function(i) {
					return Levenshtein.get(i.fname, idArray[0]);
				});
				larray = data.map(function(i) {
					return Levenshtein.get(i.lname, idArray[1]);
				});
				oarray = data.map(function(i) {
					if (i.organizationname != null)
					{
						return Levenshtein.get(i.organizationname, id);
					}
					else
					{
						return 100;
					}
				});
			}
			data.sort(function(item1, item2) {
				let useItem1, useItem2;
					useItem1 = Math.min(farray[data.indexOf(item1)], larray[data.indexOf(item1)], oarray[data.indexOf(item1)]); // Use smallest levenshtein distance

					useItem2 = Math.min(farray[data.indexOf(item2)], larray[data.indexOf(item2)],	oarray[data.indexOf(item2)]);

				return useItem1 - useItem2; // Sort
			});
			statusCode = this.statusCode['success'];
		} catch(err) {
			console.log(err);
			data = 'Internal Processing Error';
			statusCode = this.statusCode['not found'];
		}

		return new Response(data, statusCode);
	}
};

module.exports = new SearchController();
